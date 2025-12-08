import { useState } from "react";

export const useDashboardState = () => {
    const [username, setUsername] = useState("");
    const [skillProgress, setSkillProgress] = useState(75);
    const [achievements, setAchievements] = useState(12);

    const handleAddAchievement = () => {
        setAchievements((prev) => prev + 1);
    };

    const handlePractice = () => {
        setSkillProgress((prev) => Math.min(prev + 5, 100));
    };

    const handleShareProgress = () => {
        const stats = `${username || "Anonymous"
            } - ${achievements} achievements, ${skillProgress}% React mastery!`;
        navigator.clipboard?.writeText(stats);
        console.log("Copied to clipboard:", stats);
    };

    const handleReset = () => {
        setSkillProgress(75);
        setAchievements(12);
        setUsername("");
    };

    return {
        // State
        username,
        skillProgress,
        achievements,
        // Setters
        setUsername,
        // Handlers
        handleAddAchievement,
        handlePractice,
        handleShareProgress,
        handleReset,
    };
};
