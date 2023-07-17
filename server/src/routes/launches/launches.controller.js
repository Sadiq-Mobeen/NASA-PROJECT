const { 
    getAllLaunches,
    newLaunches,
    getAbortLaunch,
    abortLaunchById
 } = require('../../models/launches.model')

const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches())
}

const httpNewLaunch = (req, res) => {
    const newLaunch = req.body;
    newLaunch.launchDate = new Date(newLaunch.launchDate)

    if(!newLaunch.launchDate || !newLaunch.mission || !newLaunch.rocket || !newLaunch.target){
        return res.status(400).json({
            error: 'Missing required launch property.',
        })
    }else if(isNaN(newLaunch.launchDate)){
        return res.status(400).json({
            error: 'Please enter a valid date.',
        })
    }
    else{
        return res.status(201).json(newLaunches(newLaunch))
    }
}

const httpAbortLaunch = (req, res) => {
    const launchId = Number(req.params.id)
    //if id exist 
    if(!getAbortLaunch(launchId)){
        res.status(404).json({
            error: "Id not found"
        })
        
    }
    //if id don't exist
    const aborted = abortLaunchById(launchId)
    res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpNewLaunch,
    httpAbortLaunch
}