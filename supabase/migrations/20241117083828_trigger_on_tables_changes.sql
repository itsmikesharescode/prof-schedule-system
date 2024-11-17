-- first, create a function to handle the logging
create or replace function log_table_changes()
returns trigger as $$
begin
    insert into logs_tb (user_id, created_at, type, location_name)
    values (
        coalesce(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
        now(),
        case
            when tg_op = 'INSERT' then 'inserted'
            when tg_op = 'UPDATE' then 'updated'
            when tg_op = 'DELETE' then 'deleted'
        end,
        tg_table_name::text
    );
    return new;
end;
$$ language plpgsql security definer;

-- create triggers for each table
create trigger log_class_schedules_changes
    after insert or update or delete on class_schedules_tb
    for each row
    execute function log_table_changes();

create trigger log_programs_changes
    after insert or update or delete on programs_tb
    for each row
    execute function log_table_changes();

create trigger log_rooms_changes
    after insert or update or delete on rooms_tb
    for each row
    execute function log_table_changes();

create trigger log_school_years_changes
    after insert or update or delete on school_years_tb
    for each row
    execute function log_table_changes();

create trigger log_sections_changes
    after insert or update or delete on sections_tb
    for each row
    execute function log_table_changes();

create trigger log_subjects_changes
    after insert or update or delete on subjects_tb
    for each row
    execute function log_table_changes();

create trigger log_year_levels_changes
    after insert or update or delete on year_levels_tb
    for each row
    execute function log_table_changes();

-- add rollback functionality
create or replace function drop_triggers_and_function() returns void as $$
begin
    drop trigger if exists log_class_schedules_changes on class_schedules_tb;
    drop trigger if exists log_programs_changes on programs_tb;
    drop trigger if exists log_rooms_changes on rooms_tb;
    drop trigger if exists log_school_years_changes on school_years_tb;
    drop trigger if exists log_sections_changes on sections_tb;
    drop trigger if exists log_subjects_changes on subjects_tb;
    drop trigger if exists log_year_levels_changes on year_levels_tb;
    drop function if exists log_table_changes();
end;
$$ language plpgsql;