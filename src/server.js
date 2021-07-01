const sensor = require("ds18x20")

let main = () => {
  sensor.isDriverLoaded(function (err, isLoaded) {
    console.log("Loaded: ", isLoaded)

    sensor.list(function (err, listOfDeviceIds) {
      console.log(listOfDeviceIds)
    })
  })
}

main()
