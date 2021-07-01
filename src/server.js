const sensor = require("ds18x20")

let main = () => {
  try {
    sensor.loadDriver()

    const sensors = sensor.list()

    console.log(sensors)

  } catch (e) {
    console.error(e)
  }
}

main()
