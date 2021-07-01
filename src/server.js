const sensor = require("ds18x20")
const express = require("express")

const app = express()

const port = 8000

let getTemp = () => {
  sensor.isDriverLoaded(function (err, isLoaded) {
    if (err) return err

    sensor.list(function (err, listOfDeviceIds) {
      if (err) return err

      if (listOfDeviceIds.length > 0) {
        sensor.get(listOfDeviceIds[0], function (err, temp) {
          const fahrenheit = (temp * 1.8) + 32
          console.log(`${fahrenheit}°F`)

          return fahrenheit
        })
      } else {
        return new Error("No Devices")
      }
    })
  })
}

app.get(
  "/data",
  express.json({ type: "application/json" }),
  async (req: any, res: any) => {
    const tempature = getTemp()

    res.send({
      tempature
    })
  }
)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
