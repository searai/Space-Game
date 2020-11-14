import {pollHighScores,updateScores} from "./highScore.js"
import {checkForLoggedInUser} from "./auth.js"

checkForLoggedInUser()
updateScores()
pollHighScores()