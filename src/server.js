const sensor = require("ds18x20")

let main = async () => {
  try {
    await sensor.loadDriver()

    const sensors = await sensor.list()

    console.log(sensors)

  } catch (e) {
    console.error(e)
  }
}

main()
