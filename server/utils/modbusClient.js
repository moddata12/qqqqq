const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

let isConnected = false;

// Function to create a delay using a Promise and setTimeout
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setupModbusClient() {
  try {
    if (isConnected) return; // Avoid reconnecting if already connected
    await client.connectRTU("COM10", {
      baudRate: 19200,
      parity: "even",
      stopBits: 1,
      dataBits: 8,
    });
    client.setID(1); // Initial client ID
    client.setTimeout(10000);
    isConnected = true;
    console.log("Successfully connected to Modbus RTU on COM10");

    // Loop to change client IDs after delays
    const clientIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // IDs to change to after 15 seconds each
    for (let i = 0; i < clientIds.length; i++) {
      await delay(15000); // Wait for 15 seconds
      client.setID(clientIds[i]);
      console.log(`Modbus client ID changed to ${clientIds[i]}`);

      // Dynamically change the combineRegistersToFloat function based on client ID
      if (clientIds[i] === 4) {
        function combineRegistersToFloat(registers) {
          const buffer = Buffer.alloc(4);
          buffer.writeUInt16BE(registers[1], 0); // High word
          buffer.writeUInt16BE(registers[0], 2); // Low word
          const floatValue = buffer.readFloatBE(); // Read as float
          return parseFloat(floatValue.toFixed(2)); // Format to 2 decimal places
        }
      } else {
        function combineRegistersToFloat(registers) {
          const buffer = Buffer.alloc(4);
          buffer.writeUInt16BE(registers[0], 0); // High word
          buffer.writeUInt16BE(registers[1], 2); // Low word
          const floatValue = buffer.readFloatBE(); // Read as float
          return parseFloat(floatValue.toFixed(2)); // Format to 2 decimal places
        }
      }
    }
  } catch (error) {
    console.error("Modbus connection error:", error.message);
    isConnected = false;
    throw error;
  }
}

async function readRegister(address, length = 2) {
  try {
    if (!isConnected) {
      console.warn("Client not connected. Reconnecting...");
      await setupModbusClient();
    }
    const { data } = await client.readHoldingRegisters(address, length);
    return combineRegistersToFloat(data);
  } catch (error) {
    console.error(
      `Error reading register at address ${address}:`,
      error.message
    );
    return 0;
  }
}

module.exports = { setupModbusClient, readRegister };
