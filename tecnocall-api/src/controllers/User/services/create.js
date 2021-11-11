const Phone = require('../../../models/phone')
const Location = require('../../../models/location')
const HistoryLocation = require('../../../models/locationHistory')

async function registerLocation(mecanPhoneKey, locations, netInfo = {}) {
  if(locations.length > 0) {
    const locationsData = locations.map(({id, ...locate}) => ({
      mecanPhoneKey,
      location: {
        ...locate
      },
      netInfo
    }))
    const currentLocationData = locations.length - 1
    console.log('locationsData[0]', locationsData[currentLocationData])
    console.log('locations', locations)

    const findLastLocation = await Location.findOne({ mecanPhoneKey })

    if(findLastLocation) {
      await Location.findByIdAndUpdate(findLastLocation._id, locationsData[currentLocationData])

      return await HistoryLocation.create(locationsData[currentLocationData])
    }

    await Location.create(locationsData[currentLocationData])
    await HistoryLocation.create(locationsData)
  }


}

module.exports = async (req, res) => {
  try {
    const {mec, locations, netInfo} = req.body
    // console.log('req.body', req.body)
    const { codMecanico, nomeMecanico, numeroTelefone } = mec

    const celNumFormated = numeroTelefone.replace("(", '')
                                         .replace(")", '')
                                         .replace("-", '')
                                         .replace(" ", '')
    const mecanPhoneKey = `${codMecanico}-${celNumFormated}`
    const checkPhone = await Phone.findOne({
      codMecanico,
      numeroTelefone: celNumFormated
    })

    if(!checkPhone) {
       await Phone.create({
        codMecanico,
        nomeMecanico,
        numeroTelefone: celNumFormated,
        mecanPhoneKey
      })
      if(locations) {
        await registerLocation(mecanPhoneKey, locations, netInfo)
      }
      return res.status(201).end()
    }
    
    if(locations) {
      await registerLocation(mecanPhoneKey, locations, netInfo)
    }
    return res.status(201).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}