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

-- Create a function to add triggers safely
create or replace function create_log_triggers() returns void as $$
declare
    tables text[] := array[
        'class_schedules_tb',
        'programs_tb',
        'rooms_tb',
        'school_years_tb',
        'sections_tb',
        'subjects_tb',
        'year_levels_tb'
    ];
    t text;
begin
    foreach t in array tables
    loop
        if exists (select 1 from information_schema.tables where table_name = t) then
            execute format(
                'create trigger log_%I_changes 
                after insert or update or delete on %I 
                for each row execute function log_table_changes()',
                t, t
            );
        end if;
    end loop;
end;
$$ language plpgsql;

-- Execute the function to create triggers
select create_log_triggers();

-- Drop the helper function as it's no longer needed
drop function create_log_triggers();

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