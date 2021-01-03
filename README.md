# Immigration Bot
A simple bot that can be used to automatically rank users in your group upon join.

## Setup

Most of this is a normal thing, but there are some other parts that the average ROBLOXian may not know about this.
All of the config is in the `.env` file.

### TOKEN
This is the discord token of the bot. To get this, please go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and make an application, activate the bot account, and put its token in this field.

### COOKIE
This is the cookie of the ROBLOX account you want to link your bot to. This account needs to have ranking permissions to the group you want to set this bot up for. I DO NOT RECOMMEND USING YOUR MAIN ACCOUNT.

### GROUPID, CITIZENROLE, DETAINROLE
Pretty self explanatory. The group ID is, well, the group ID, citizen role is for those who are in no blacklisted groups, and detain role is for those caught in blacklisted groups.

### IMMIGRATIONRANK
Well, this is one of the tougher parts. In ROBLOX, ranks have a role ID and a rank ID. This one requires the ROLE ID. To get this, right click your rank as shown and open in a new tab:

![rightclick](readmeassets/rightclick.png)

You will be then led to a 404 page. Do not fret, as the role ID is right up there for you! It should be the ID with 6-7 digits.

![roleid](readmeassets/roleid.png)

### BLACKLISTED
This is a list of blacklisted groups. Seperate the group IDs with commas.

### PREFIX
This may be an immigration bot that should have no commands, but no, it does! This is the prefix of those commands.

## Commands
There is only one command, but it serves a purpose in the bot. `>immigration` serves the purpose of choosing to open or close the border. You can use `>immigration on|true|enable` to open the borders and `>immigration off|false|disable` to close the borders.