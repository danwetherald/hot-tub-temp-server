const sensor = require("ds18x20")
const express = require("express")

const app = express()

const port = 8000

const padding = 2

let getTemp = () => {
  return new Promise((resolve, reject) => {
    sensor.isDriverLoaded(function (err, _isLoaded) {
      if (err) reject(err)

      sensor.list(function (err, listOfDeviceIds) {
        if (err) reject(err)

        if (listOfDeviceIds.length > 0) {
          sensor.get(listOfDeviceIds[0], function (_err, temp) {
            const fahrenheit = Math.ceil(((temp * 1.8) + 32) + padding)
            console.log(`${fahrenheit}°F`)

            resolve(fahrenheit)
          })
        } else {
          reject(new Error("No Devices"))
        }
      })
    })
  })
}

app.get(
  "/data",
  express.json({ type: "application/json" }),
  async (req, res) => {
    try {
      const temperature = await getTemp()

      res.send({
        temperature
      })
    } catch (err) {
      res.sendStatus(500)
    }
  }
)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
