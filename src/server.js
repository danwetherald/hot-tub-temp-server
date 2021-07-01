const sensor = require("ds18x20")

let main = () => {
  sensor.isDriverLoaded(function (err, isLoaded) {
    console.log("Loaded: ", isLoaded)

    sensor.list(function (err, listOfDeviceIds) {
      console.log(listOfDeviceIds)

      if (listOfDeviceIds.length > 0) {
        sensor.get(listOfDeviceIds[0], function (err, temp) {
          console.log(temp);
        })
      }
    })
  })
}

main()
