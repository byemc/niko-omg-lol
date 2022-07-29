// sitewide achievement handler

path = document.location.pathname;
console.log("%cDEBUG::%cpath: " + path, "color: #0af; font-weight: bold;", "all: unset;");

// get the achievements from /achievements.json
fetch("/achievements.json")
    .then(response => response.json())
    .then(data => {
        achievements = data;
        console.log("%cDEBUG::%cachievements: " + JSON.stringify(achievements), "color: #0af; font-weight: bold;", "all: unset;");
    })

grantedAchievements = document.cookie.split("; ").map(cookie => cookie.split("=")[0]);
console.log("%cDEBUG::%cgrantedAchievements: " + JSON.stringify(grantedAchievements), "color: #0af; font-weight: bold;", "all: unset;");

const grantAchievement = (achievement) => {
    // check if the achievement is already granted
    if (grantedAchievements.includes(achievement)) {
        console.log("%cDEBUG::%cachievement already granted: " + achievement, "color: #0af; font-weight: bold;", "all: unset;");
        return;
    }
    grantedAchievements.push(achievement);
    document.cookie = achievement + "=true; max-age=31536000";
    console.log("%cDEBUG::%cgrantedAchievement: " + achievement, "color: #0af; font-weight: bold;", "all: unset;");

}
