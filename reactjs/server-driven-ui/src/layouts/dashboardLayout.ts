import type { SDUIComponent } from "../sdui/types";

interface DashboardLayoutParams {
    username: string;
    skillProgress: number;
    achievements: number;
    setUsername: (value: string) => void;
    handlePractice: () => void;
    handleAddAchievement: () => void;
    handleShareProgress: () => void;
    handleReset: () => void;
}

export const createDashboardLayout = ({
    username,
    skillProgress,
    achievements,
    setUsername,
    handlePractice,
    handleAddAchievement,
    handleShareProgress,
    handleReset,
}: DashboardLayoutParams): SDUIComponent => ({
    id: "root-container",
    type: "container",
    props: {
        style: {
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: "sans-serif",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        },
    },
    children: [
        // Header Section
        {
            id: "header",
            type: "container",
            props: {
                style: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                },
            },
            children: [
                {
                    id: "title",
                    type: "text",
                    props: {
                        content: "🚀 Learning Dashboard",
                        style: {
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#1a1a1a",
                            margin: 0,
                        },
                    },
                },
                {
                    id: "status-badge",
                    type: "badge",
                    props: {
                        text: `${achievements} Achievements`,
                        variant: "success",
                        style: { fontSize: "1rem" },
                    },
                },
            ],
        },

        // Divider
        {
            id: "divider-1",
            type: "divider",
            props: {},
        },

        // Profile Card
        {
            id: "profile-card",
            type: "card",
            props: {
                title: "👤 Your Profile",
                style: { marginBottom: "1.5rem" },
            },
            children: [
                {
                    id: "username-label",
                    type: "text",
                    props: {
                        content: "Username",
                        style: {
                            fontWeight: "bold",
                            marginBottom: "0.25rem",
                            color: "#555",
                        },
                    },
                },
                {
                    id: "username-input",
                    type: "input",
                    props: {
                        placeholder: "Enter your username...",
                        value: username,
                        onChange: setUsername,
                        style: { marginBottom: "1rem" },
                    },
                },
                {
                    id: "greeting",
                    type: "text",
                    props: {
                        content: username
                            ? `Welcome back, ${username}! 👋`
                            : "Please enter your username above",
                        style: {
                            color: username ? "#28a745" : "#666",
                            fontStyle: username ? "normal" : "italic",
                            fontSize: "1.1rem",
                            fontWeight: username ? "bold" : "normal",
                        },
                    },
                },
            ],
        },

        // Skills Progress Card
        {
            id: "skills-card",
            type: "card",
            props: {
                title: "📊 Your Skills",
                style: { marginBottom: "1.5rem" },
            },
            children: [
                {
                    id: "react-progress",
                    type: "progressbar",
                    props: {
                        label: "React Mastery",
                        value: skillProgress,
                        max: 100,
                        color: "#61dafb",
                        style: { marginBottom: "1rem" },
                    },
                },
                {
                    id: "typescript-progress",
                    type: "progressbar",
                    props: {
                        label: "TypeScript",
                        value: 85,
                        max: 100,
                        color: "#3178c6",
                        style: { marginBottom: "1rem" },
                    },
                },
                {
                    id: "sdui-progress",
                    type: "progressbar",
                    props: {
                        label: "Server-Driven UI",
                        value: 90,
                        max: 100,
                        color: "#764ba2",
                        style: { marginBottom: "1rem" },
                    },
                },
                {
                    id: "practice-button",
                    type: "button",
                    props: {
                        label: "🎯 Practice React (+5%)",
                        onClick: handlePractice,
                        style: {
                            backgroundColor: "#61dafb",
                            color: "#000",
                            fontWeight: "bold",
                        },
                    },
                },
            ],
        },

        // Recent Activities Card
        {
            id: "activities-card",
            type: "card",
            props: {
                title: "📝 Recent Activities",
                style: { marginBottom: "1.5rem" },
            },
            children: [
                {
                    id: "activities-list",
                    type: "list",
                    props: {
                        items: [
                            "✅ Completed React Hooks tutorial",
                            "🎨 Built a Server-Driven UI system",
                            "📚 Learned TypeScript generics",
                            "🔥 Contributed to open source project",
                        ],
                    },
                },
            ],
        },

        // Action Buttons
        {
            id: "actions-container",
            type: "container",
            props: {
                style: {
                    flexDirection: "row",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                },
            },
            children: [
                {
                    id: "achievement-btn",
                    type: "button",
                    props: {
                        label: "🏆 Unlock Achievement",
                        onClick: handleAddAchievement,
                        style: {
                            backgroundColor: "#ffc107",
                            color: "#000",
                            fontWeight: "bold",
                            padding: "0.75rem 1.5rem",
                        },
                    },
                },
                {
                    id: "share-btn",
                    type: "button",
                    props: {
                        label: "📤 Share Progress",
                        onClick: handleShareProgress,
                        style: {
                            backgroundColor: "#17a2b8",
                            fontWeight: "bold",
                            padding: "0.75rem 1.5rem",
                        },
                    },
                },
                {
                    id: "reset-btn",
                    type: "button",
                    props: {
                        label: "🔄 Reset Progress",
                        onClick: handleReset,
                        style: {
                            backgroundColor: "#6c757d",
                            fontWeight: "bold",
                            padding: "0.75rem 1.5rem",
                        },
                    },
                },
            ],
        },

        // Footer note
        {
            id: "footer-note",
            type: "text",
            props: {
                content:
                    "💡 All of this UI is defined by JSON and rendered dynamically!",
                style: {
                    textAlign: "center",
                    marginTop: "2rem",
                    color: "#666",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                },
            },
        },
    ],
});
