create or replace function is_professor() returns boolean as $$
begin
    return exists(
        select 1 from public.roles_tb where user_id = auth.uid() and role = 'professor'
    );
end;
$$ language plpgsql security definer;

