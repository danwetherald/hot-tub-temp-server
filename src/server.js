const sensor = require("ds18x20")
const express = require("express")

const app = express()

const port = 8000

let getTemp = () => {
  return new Promise((resolve, reject) => {
    sensor.isDriverLoaded(function (err, isLoaded) {
      if (err) reject(err)

      sensor.list(function (err, listOfDeviceIds) {
        if (err) reject(err)

        if (listOfDeviceIds.length > 0) {
          sensor.get(listOfDeviceIds[0], function (err, temp) {
            const fahrenheit = (temp * 1.8) + 32
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
      const tempature = await getTemp()

      res.send({
        tempature
      })
    } catch (err) {
      res.sendStatus(500)
    }
  }
)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
