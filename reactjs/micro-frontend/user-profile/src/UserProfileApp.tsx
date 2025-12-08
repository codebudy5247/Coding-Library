import { useState } from 'react';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    bio: string;
    notifications: boolean;
    theme: 'light' | 'dark';
}

const UserProfileApp = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Software developer passionate about micro frontends and distributed systems.',
        notifications: true,
        theme: 'light',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (field: keyof UserProfile, value: any) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log('Profile saved:', profile);
        alert('Profile saved successfully!');
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '2rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
            }}>
                <h2 style={{ margin: 0, color: '#333' }}>👤 User Profile</h2>
                <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    style={{
                        padding: '0.5rem 1.5rem',
                        background: isEditing ? '#28a745' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    {isEditing ? '💾 Save' : '✏️ Edit'}
                </button>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: '#f9f9f9',
                borderRadius: '8px',
            }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    marginRight: '1.5rem',
                }}>
                    👤
                </div>
                <div style={{ flex: 1 }}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                            }}
                        />
                    ) : (
                        <>
                            <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem', color: '#333' }}>
                                {profile.name}
                            </h3>
                            <p style={{ margin: 0, color: '#666' }}>{profile.email}</p>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Email */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
                        Email
                    </label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        />
                    ) : (
                        <p style={{ margin: 0, color: '#666' }}>{profile.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
                        Phone
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        />
                    ) : (
                        <p style={{ margin: 0, color: '#666' }}>{profile.phone}</p>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
                        Bio
                    </label>
                    {isEditing ? (
                        <textarea
                            value={profile.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                            }}
                        />
                    ) : (
                        <p style={{ margin: 0, color: '#666' }}>{profile.bio}</p>
                    )}
                </div>

                {/* Settings */}
                <div style={{
                    padding: '1.5rem',
                    background: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Settings</h4>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                        <label style={{ color: '#555' }}>Email Notifications</label>
                        <input
                            type="checkbox"
                            checked={profile.notifications}
                            onChange={(e) => handleChange('notifications', e.target.checked)}
                            disabled={!isEditing}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: isEditing ? 'pointer' : 'not-allowed',
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <label style={{ color: '#555' }}>Theme</label>
                        <select
                            value={profile.theme}
                            onChange={(e) => handleChange('theme', e.target.value)}
                            disabled={!isEditing}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: isEditing ? 'pointer' : 'not-allowed',
                            }}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </div>

            {isEditing && (
                <button
                    onClick={() => {
                        setIsEditing(false);
                        window.location.reload(); // Reset changes
                    }}
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1.5rem',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default UserProfileApp;
