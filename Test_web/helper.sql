use iegame_db;

select * from user_data;
select * from rank_info;
select * from team_info;
select * from match_game;
select * from mode_info;
select * from user_game_status_info;
select * from match_history_user_detail;
select * from match_history_detail_inventory;
select * from match_history_user_spell_detail;
select * from game_log_error;
select * from user_rank_info;
select * from game_gift_code;

call iesp_GetRankInfo();

select u.match_id, u.user_id, m.time_created
from match_history_user_detail u, match_game m
where u.match_id = m.id