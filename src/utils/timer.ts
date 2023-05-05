import Discord from "discord.js";

const timers = new Map();

export function startTimer(name: string, time: string, interaction: Discord.CommandInteraction) {
  const interval = setInterval(() => {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
    if (currentTime === time) {
      interaction.channel!.send(`<@${interaction.user.id}> Timer ${name} has been triggered!`);
      // clearInterval(interval);
    }
  }, 1000);
  timers.set(name, interval);
}

export function stopTimer(name: string) {
  clearInterval(timers.get(name));
  timers.delete(name);
}

export function getTimers() {
  return timers;
}

export function getTimer(name: string) {
  return timers.get(name);
}