create or replace function add_class_schedules(
    professor_id uuid,
    school_year_id int8,
    department_id int8,
    section_id int8,
    year_level_id int8,
    subject_id int8,
    room_id int8,
    semester text,
    day text,
    initial_time time,
    final_time time
) returns void as $$
begin
    -- Check if there's any overlap for the same subject and day
    if exists (
        select 1 
        from class_schedules_tb cs
        where cs.subject_id = $6  -- Using positional parameter for subject_id
        and cs.day = $9          -- Using positional parameter for day
        and (
            (cs.initial_time <= $10 and cs.final_time > $10) or
            (cs.initial_time < $11 and cs.final_time >= $11) or
            ($10 <= cs.initial_time and $11 >= cs.final_time)
        )
    ) then
        raise exception 'This time slot for the subject is already taken';
    end if;

    -- Check if professor has any other class at the same time
    if exists (
        select 1 
        from class_schedules_tb cs
        where cs.professor_id = $1  -- Using positional parameter for professor_id
        and cs.day = $9            -- Using positional parameter for day
        and (
            (cs.initial_time <= $10 and cs.final_time > $10) or
            (cs.initial_time < $11 and cs.final_time >= $11) or
            ($10 <= cs.initial_time and $11 >= cs.final_time)
        )
    ) then
        raise exception 'Professor already has a class scheduled during this time slot';
    end if;

    -- If no conflict, proceed with insert
    insert into class_schedules_tb (
        professor_id, school_year_id, department_id, section_id, 
        year_level_id, subject_id, room_id, semester, day, 
        initial_time, final_time
    )
    values (
        professor_id, school_year_id, department_id, section_id, 
        year_level_id, subject_id, room_id, semester, day, 
        initial_time, final_time
    );
end;
$$ language plpgsql;