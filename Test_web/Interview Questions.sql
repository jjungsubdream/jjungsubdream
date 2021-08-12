use iegame_db;

DROP PROCEDURE IF EXISTS iesp_GetNumUnFinishedGamePerDay;  
DELIMITER // 
CREATE PROCEDURE iesp_GetNumUnFinishedGamePerDay()
select date(m.time_created) as `date`, count(m.id) as NumUnfinishedGame
from match_game m
where m.team_win_id like  -1
group by date(m.time_created);
//
delimiter ;

# (1) Find number of games played per day
DROP PROCEDURE IF EXISTS iesp_GetNumPlayedGamePerDay;  
DELIMITER // 
CREATE PROCEDURE iesp_GetNumPlayedGamePerDay()
select date(m.time_created) as `date`, count(m.id) as NumPlayedGame
from match_game m
where m.team_win_id not like  -1
group by date(m.time_created);
//
DELIMITER ;

# call unfinishedGame + finishedGame per day
DROP PROCEDURE IF EXISTS iesp_GetTotalPlayedGamePerDay;  
DELIMITER // 
CREATE PROCEDURE iesp_GetTotalPlayedGamePerDay()
select date(m.time_created) as `date`,
	SUM(CASE 
		WHEN m.team_win_id not like -1
        THEN 1 
        ELSE 0 
        END) AS NumPlayedGame,
	SUM(CASE 
		WHEN m.team_win_id like -1
        THEN 1 
        ELSE 0 
        END) AS NumUnfinishedGame
from match_game m
group by date(m.time_created)
order by date(m.time_created) desc;
//
delimiter ;


#this result includes duplicate users per a day. 
DROP PROCEDURE IF EXISTS iesp_GetNumPlayedPlayersPerDay;  
DELIMITER // 
CREATE PROCEDURE iesp_GetNumPlayedPlayersPerDay()
select date(m.time_created) as `date`, count(distinct u.user_id) as NumPlayedPlayer, count(u.user_id) as NumTotalPlayedPlayer
from match_history_user_detail u, match_game m
where u.match_id = m.id 
and u.user_id > 8
and u.user_id < 2147483639
group by date(m.time_created)
order by date(m.time_created) desc;
//
DELIMITER ;


drop procedure if exists iesp_getUserData;
delimiter //
create procedure iesp_getUserData(in tempDate varchar(30))
select distinct u.user_id, u.character_name
from match_history_user_detail h, match_game m, user_data u
where h.match_id = m.id 
and h.user_id = u.user_id
and m.time_created like tempDate;
//
delimiter ;

drop procedure if exists iesp_getGameData;
delimiter //
create procedure iesp_getGameData(in tempDate varchar(30))
select m.id as game_id, m.time_created, m.time_ended, u.user_id, u.character_name, h.team_id, d.name as mode_id
from match_game m, match_history_user_detail h, user_data u, mode_info d
where m.id = h.match_id
and h.user_id = u.user_id
and m.mode_id = d.id
and m.team_win_id not like -1
and m.time_created like tempDate;
//
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetRank;  
DELIMITER // 
CREATE PROCEDURE iesp_GetRank(in `start` int)
	Begin
		declare sIndex int default (`start`-1)*100;
        declare eIndex int default (`start`)*100;
		select u.user_id, u.character_name, r.current_points, sum(r.total_wins + r.total_loses) as TotalNumGame
		from user_rank_info r, user_data u
		where r.user_id = u.user_id
        and (r.total_wins + r.total_loses) not like 0
		group by r.user_id
		order by current_points desc
		Limit sIndex, eIndex;
	end// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetTotalPlayedGame;  
DELIMITER // 
CREATE PROCEDURE iesp_GetTotalPlayedGame()
select count(m.id) as TotalPlayedGame
from match_game m
where m.team_win_id not like -1;
// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetTotalPlayedPlayer;  
DELIMITER // 
CREATE PROCEDURE iesp_GetTotalPlayedPlayer()
select count(distinct u.user_id) as TotalCumulativePlayedPlayer
from user_data u
where u.user_id > 8
// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetNumPick;  
DELIMITER //
create procedure iesp_GetNumPick()
select champion_id, count(champion_id) as numPick
from match_history_user_detail
where champion_id not like 10
group by champion_id;
// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetNumWin;  
DELIMITER //
create procedure iesp_GetNumWin()
select h.champion_id, count(h.champion_id) as numWin
from match_history_user_detail h, match_game m 
where h.match_id = m.id
and m.team_win_id = h.team_id
and h.champion_id not like 10
group by champion_id;
// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetUserHistory;  
DELIMITER //
create procedure iesp_GetUserHistory(in tempId varchar(30))
select h.user_id, h.match_id, h.team_id, m.team_win_id, m.time_created, m.time_ended, 
TIMESTAMPDIFF(MINUTE, m.time_created, m.time_ended) as play_time,
h.champion_id, h.champion_level, h.total_kills, h.total_deaths, h.total_assists, h.total_gold, h.minion_killed
from match_history_user_detail h, match_game m
where h.match_id = m.id
and h.user_id = tempId
order by m.time_created desc;
// 
delimiter ;


DROP PROCEDURE IF EXISTS iesp_GetSearchUser;  
DELIMITER //
create procedure iesp_GetSearchUser(in tempId varchar(100))
select h.match_id, h.team_id, m.team_win_id, m.time_created, m.time_ended, TIMESTAMPDIFF(MINUTE, m.time_created, m.time_ended) as play_time
from match_history_user_detail h, match_game m, user_data u
where h.match_id = m.id
and h.user_id = u.user_id
and binary u.character_name like tempId
order by m.time_created desc;
// 
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetPlayedPlayerAtLeast1;  
DELIMITER //
create procedure iesp_GetPlayedPlayerAtLeast1()
select distinct u.user_id, u.character_name
from user_data u, match_history_user_detail h
where u.user_id = h.user_id;
//
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetGiftCode;  
DELIMITER //
create procedure iesp_GetGiftCode()
select c.code_string, c.description ,c.time_used, c.max_time_use
from game_gift_code c; 
//
delimiter ;

DROP PROCEDURE IF EXISTS iesp_GetGiftCodeByGroup;  
DELIMITER //
create procedure iesp_GetGiftCodeByGroup()
select c.description ,sum(c.time_used) as totalTimeUsed, sum(c.max_time_use) as totalMaxTimeUse
from game_gift_code c
group by c.description; 
//
delimiter ;

select @@global.time_zone, @@session.time_zone, @@system_time_zone;
select now();
-- set time_zone = '-8:00';

use iegame_db;

call iesp_GetNumPlayedGamePerDay();
call iesp_GetNumUnFinishedGamePerDay();
call iesp_GetTotalPlayedGamePerDay();
call iesp_GetNumPlayedPlayersPerDay();
call iesp_getUserData("2021-06-15%");
call iesp_getGameData("2021-06-23%");
call iesp_GetRank(1);
call iesp_GetTotalPlayedGame();
call iesp_GetTotalPlayedPlayer();
call iesp_GetNumPick();
call iesp_GetNumWin();
call iesp_GetUserHistory(32);
call iesp_GetSearchUser("Essie");
call iesp_GetGiftCode();
call iesp_GetGiftCodeByGroup();
call iesp_GetPlayedPlayerAtLeast1();
