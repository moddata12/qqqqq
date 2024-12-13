const ModbusRTU = require("modbus-serial");
const mqtt = require("mqtt");
const { MetersModel } = require("../models/meterModel");
const mqttClient = mqtt.connect(process.env.MQTT_URL);

const panels = {
  1: "EB Incomer",
  2: "Generator",
  3: "Old MV Panel",
  4: "APFC Panel",
  5: "MLSB Panel",
  6: "Muffle Panel",
  7: "Terminal Panel",
  8: "Induction Panel",
  9: "HT VCB Panel",
};

let isConnected = false;
const client = new ModbusRTU();

// Function to create a delay using a Promise and setTimeout
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to combine Modbus registers into a float
function combineRegistersToFloat(registers, reverse = false) {
  const buffer = Buffer.alloc(4);
  if (reverse) {
    buffer.writeUInt16BE(registers[1], 0); // High word
    buffer.writeUInt16BE(registers[0], 2); // Low word
  } else {
    buffer.writeUInt16BE(registers[0], 0); // High word
    buffer.writeUInt16BE(registers[1], 2); // Low word
  }
  return parseFloat(buffer.readFloatBE().toFixed(2));
}

// Function to set up Modbus RTU client
async function setupModbusClient() {
  try {
    if (isConnected) return;

    await client.connectRTU(process.env.COM_PORT, {
      baudRate: parseInt(process.env.BAUDRATE, 10),
      parity: process.env.PARITY,
      stopBits: parseInt(process.env.STOP_BITS, 10),
      dataBits: parseInt(process.env.DATA_BITS, 10),
    });

    client.setTimeout(1000);
    isConnected = true;
    console.log("Successfully connected to Modbus RTU on COM10");
  } catch (error) {
    console.error("Modbus connection error:", error.message);
    isConnected = false;
  }
}

// Function to read a register with Modbus client
async function readRegister(address, length = 2, reverse = false) {
  try {
    if (!isConnected) {
      console.warn("Client not connected. Reconnecting...");
      await setupModbusClient();
    }

    const response = await client.readHoldingRegisters(address, length);
    return combineRegistersToFloat(response.data, reverse);
  } catch (error) {
    console.error(
      `Error reading register at address ${address}:`,
      error.message
    );
    return 0; // Default value in case of an error
  }
}

// Function to read and save data at regular intervals
async function readAndSaveDataContinuously(clientIds) {
  for (const clientId of clientIds) {
    try {
      client.setID(clientId);
      console.log(`Modbus client ID set to ${clientId}`);

      const measurements = {};

      if (clientId === 4) {
        // Registers specific to client ID 4
        measurements.voltageln = (await readRegister(0x8c, 2, true)) || 0;
        measurements.voltage = (await readRegister(0x84, 2, true)) || 0;
        measurements.current = (await readRegister(0x94, 2, true)) || 0;
        measurements.activepower = (await readRegister(0x64, 2, true)) || 0;
        measurements.reactivepower = (await readRegister(0x6a, 2, true)) || 0;
        measurements.apparentpower = (await readRegister(0x7c, 2, true)) || 0;
        measurements.activepowerh = (await readRegister(0x9e, 2, true)) || 0;
        measurements.apparentpowerh = (await readRegister(0xa0, 2, true)) || 0;
        measurements.powerfactor = (await readRegister(0x74, 2, true)) || 0;
        measurements.frequency = (await readRegister(0x9c, 2, true)) || 0;

        measurements.voltageri = (await readRegister(0x8e, 2, true)) || 0;
        measurements.currentri = (await readRegister(0x96, 2, true)) || 0;
        measurements.voltageyi = (await readRegister(0x90, 2, true)) || 0;
        measurements.currentyi = (await readRegister(0x98, 2, true)) || 0;
        measurements.voltagebi = (await readRegister(0x92, 2, true)) || 0;
        measurements.currentbi = (await readRegister(0x9a, 2, true)) || 0;
        measurements.voltagery = (await readRegister(0x86, 2, true)) || 0;
        measurements.voltageyb = (await readRegister(0x88, 2, true)) || 0;
        measurements.voltagebr = (await readRegister(0x8a, 2, true)) || 0;
        measurements.activepowerri = (await readRegister(0x66, 2, true)) || 0;
        measurements.apparentpowerri = (await readRegister(0x7e, 2, true)) || 0;
        measurements.powerfactorri = (await readRegister(0x76, 2, true)) || 0;
        measurements.activepoweryi = (await readRegister(0x68, 2, true)) || 0;
        measurements.apparentpoweryi = (await readRegister(0x80, 2, true)) || 0;
        measurements.powerfactoryi = (await readRegister(0x78, 2, true)) || 0;
        measurements.activepowerbi = (await readRegister(0x6a, 2, true)) || 0;
        measurements.apparentpowerbi = (await readRegister(0x82, 2, true)) || 0;
        measurements.powerfactorbi = (await readRegister(0x7a, 2, true)) || 0;
      } else {
        // Default registers for other client IDs
        measurements.activepowerh = (await readRegister(2699, 2)) || 0;
        measurements.reactivepowerh = (await readRegister(2707, 2)) || 0;
        measurements.apparentpowerh = (await readRegister(2715, 2)) || 0;
        measurements.currentri = (await readRegister(2999, 2)) || 0;
        measurements.currentyi = (await readRegister(3001, 2)) || 0;
        measurements.currentbi = (await readRegister(3003, 2)) || 0;
        measurements.current = (await readRegister(3009, 2)) || 0;
        measurements.activepower = (await readRegister(3059, 2)) || 0;
        measurements.reactivepower = (await readRegister(3067, 2)) || 0;
        measurements.voltagery = (await readRegister(3019, 2)) || 0;
        measurements.voltageyb = (await readRegister(3021, 2)) || 0;
        measurements.voltagebr = (await readRegister(3023, 2)) || 0;
        measurements.voltageri = (await readRegister(3027, 2)) || 0;
        measurements.voltageyi = (await readRegister(3029, 2)) || 0;
        measurements.voltagebi = (await readRegister(3031, 2)) || 0;
        measurements.voltage = (await readRegister(3035, 2)) || 0;
        measurements.activepowerri = (await readRegister(3053, 2)) || 0;
        measurements.activepoweryi = (await readRegister(3055, 2)) || 0;
        measurements.activepowerbi = (await readRegister(3057, 2)) || 0;
        measurements.reactivepowerri = (await readRegister(3061, 2)) || 0;
        measurements.reactivepoweryi = (await readRegister(3063, 2)) || 0;
        measurements.reactivepowerbi = (await readRegister(3065, 2)) || 0;
        measurements.apparentpowerri = (await readRegister(3069, 2)) || 0;
        measurements.apparentpoweryi = (await readRegister(3071, 2)) || 0;
        measurements.apparentpowerbi = (await readRegister(3073, 2)) || 0;
        measurements.apparentpower = (await readRegister(3075, 2)) || 0;
        measurements.powerfactorri = (await readRegister(3077, 2)) || 0;
        measurements.powerfactoryi = (await readRegister(3079, 2)) || 0;
        measurements.powerfactorbi = (await readRegister(3081, 2)) || 0;
        measurements.frequency = (await readRegister(3109, 2)) || 0;
        measurements.powerfactor = (await readRegister(3191, 2)) || 0;
      }

      const datetime = new Date();
      const panelname = panels[clientId] || "Unknown Panel";
      const newEntry = new MetersModel({
        mid: clientId,
        datetime,
        measurements: { ...measurements, panelname },
      });
      await newEntry.save();

      // Publish data to MQTT
      let BASE_URL = process.env.MQTT_URL;
      const topic = `${BASE_URL}/api/v1/getCard${clientId}`;

      const message = JSON.stringify({
        mid: clientId,
        datetime,
        measurements: { ...measurements, panelname },
      });
      // console.log(`Data for client ${clientId} saved and published to MQTT`);
      mqttClient.publish(topic, message, { qos: 1 }, (err) => {
        if (err) {
          console.error(
            `Error publishing to MQTT for client ID ${clientId}:`,
            err.message
          );
        } else {
          console.log(
            `Data for client ${clientId} saved to MongoDB and published to MQTT topic "${topic}"`
          );
        }
      });
    } catch (error) {
      console.error(
        `Error reading or saving data for client ID ${clientId}:`,
        error.message
      );
    }
    // Delay between readings
    await delay(2000);
  }
}

// Main function to start continuous reading
async function startContinuousReading() {
  await setupModbusClient();
  const clientIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Modify as needed
  while (true) {
    await readAndSaveDataContinuously(clientIds);
  }
}

startContinuousReading();
