// sitewide achievement handler

path = document.location.pathname;
console.log("%cDEBUG::%cpath: " + path, "color: #0af; font-weight: bold;", "all: unset;");

var achievements = []

// get the achievements from /achievements.json
fetch("/achievements.json")
    .then(response => response.json())

    .then(data => {
        achievements = data;
        // console.log("%cDEBUG::%cachievements: " + JSON.stringify(achievements), "color: #0af; font-weight: bold;", "all: unset;");
    })

grantedAchievements = document.cookie.split("; ").map(cookie => cookie.split("=")[0]);
console.log("%cDEBUG::%cgrantedAchievements: " + JSON.stringify(grantedAchievements), "color: #0af; font-weight: bold;", "all: unset;");

const findAchievement = (achievement_id) => {
    // find the achievement in the list
    console.log(achievement_id)
    var achievement = achievements.find(achievement => achievement.id == achievement_id);
    console.log(achievement)
    if (!achievement) {
        console.log("%cDEBUG::%cachievement not found: " + achievement_id, "color: #0af; font-weight: bold;", "all: unset;");
        return undefined;
    }
    return achievement;
}

// filter the achievements based on grantedAchievements
const filterAchievements = () => {
    var filteredAchievements = achievements.filter(achievement => !grantedAchievements.includes(achievement.id));
    // console.log("%cDEBUG::%cfilteredAchievements: " + JSON.stringify(filteredAchievements), "color: #0af; font-weight: bold;", "all: unset;");
    return filteredAchievements;
}

filterAchievements();

function grantAchievement (achievement_id) {
    // check if the achievement is already granted
    if (grantedAchievements.includes(achievement_id)) {
        console.log("%cDEBUG::%cachievement already granted: " + achievement_id, "color: #0af; font-weight: bold;", "all: unset;");
        // check that the cant_do_that is not already granted
        if (grantedAchievements.includes("cant_do_that")) {
            console.log("%cDEBUG::%cachievement cant_do_that already granted", "color: #0af; font-weight: bold;", "all: unset;");
        } else {
            grantAchievement("cant_do_that");
        }
        return;
    }

    // find the achievement in the list
    var achievement = achievements.find(achievement => achievement.id == achievement_id);
    console.log(achievement)
    if (!achievement) {
        console.log("%cDEBUG::%cachievement not found: " + achievement_id, "color: #0af; font-weight: bold;", "all: unset;");
        return;
    }

    if (!achievement.icon) {
        achievement.icon = "/img/cg_dream4_4_crop.png";
    }

    // display the achievement
    const ach_container = `<div id="ach_container"><img id="ach_icon" src="${achievement.icon}">
    <span id="ach_subtitle">Achievement Get!</span><span id="ach_title">${achievement.name}</span></div>`
    // add the container to the page
    document.body.insertAdjacentHTML("beforeend", ach_container);
    if (achievement.sound) {
        // play the sound
        var sfx = new Audio(achievement.sound);
    } else {
        sfx = new Audio("/sound/get_item.wav");
    }
    sfx.play();

    grantedAchievements.push(achievement_id);
    document.cookie = achievement_id + "=true; max-age=31536000";
    console.log("%cDEBUG::%cgrantedAchievement: " + achievement_id, "color: #0af; font-weight: bold;", "all: unset;");

    setTimeout(() => {
        document.getElementById("ach_container").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("ach_container").remove();
        }, 1000);
    }, 5000); 

}

function removeAchievement (achievement) {
    // check if the achievement is already granted
    if (!grantedAchievements.includes(achievement)) {
        console.log("%cDEBUG::%cachievement not granted: " + achievement, "color: #0af; font-weight: bold;", "all: unset;");
        return;
    }
    grantedAchievements.splice(grantedAchievements.indexOf(achievement), 1);
    document.cookie = achievement + "=; max-age=0";
    console.log("%cDEBUG::%cremovedAchievement: " + achievement, "color: #0af; font-weight: bold;", "all: unset;");
}
