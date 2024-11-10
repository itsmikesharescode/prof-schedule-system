create or replace function query_admin_get_professors(
    search_query text
) returns setof professors_tb as $$
begin
    if search_query is not null and search_query != '' then
        return query
        select * from professors_tb
        where user_meta_data->>'department' = search_query
        order by created_at asc;
    else
        return query
        select * from professors_tb
        order by created_at asc;
    end if;
end;
$$ language plpgsql security definer;