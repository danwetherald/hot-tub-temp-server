const sensor = require("ds18x20")

let main = () => {
  sensor.isDriverLoaded(function (err, isLoaded) {
    console.log(isLoaded);
  })
}

main()
