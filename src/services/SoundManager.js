/**
 * SoundManager.js
 * Singleton service to manage audio effects and ambience.
 * 
 * Capabilities:
 * - Play SFX (Heartbeat, Alerts, UI)
 * - Mute/Unmute global
 */

class SoundManagerService {
    constructor() {
        this.muted = false;
        this.sounds = {
            // Heartbeats
            heartbeat_normal: new Audio('/assets/sfx/heartbeat_Monitor.mp3'), // Placeholder paths
            heartbeat_fast: new Audio('/assets/sfx/heartbeat_fast.mp3'),

            // Alerts
            alert_high: new Audio('/assets/sfx/monitor_alarm_high.mp3'),
            alert_medium: new Audio('/assets/sfx/monitor_alarm_med.mp3'),

            // UI
            click: new Audio('/assets/sfx/ui_click.mp3'),
            success: new Audio('/assets/sfx/success_chime.mp3'),
            error: new Audio('/assets/sfx/error_buzz.mp3'),

            // Narrative
            phone_ring: new Audio('/assets/sfx/phone_ring.mp3')
        };

        // Preload settings?
        Object.values(this.sounds).forEach(s => {
            s.volume = 0.5;
        });
    }

    play(key) {
        if (this.muted) return;
        const sound = this.sounds[key];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.warn("Audio play failed (user interaction?):", e));
        } else {
            console.warn(`Sound key '${key}' not found.`);
        }
    }

    setMuted(mute) {
        this.muted = mute;
    }
}

export const SoundManager = new SoundManagerService();
