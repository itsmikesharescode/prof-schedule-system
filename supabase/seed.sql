

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."drop_triggers_and_function"() RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."drop_triggers_and_function"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists(
        select 1 from public.roles_tb where user_id = auth.uid() and role = 'admin'
    );
end;
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_professor"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists(
        select 1 from public.roles_tb where user_id = auth.uid() and role = 'professor'
    );
end;
$$;


ALTER FUNCTION "public"."is_professor"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_program_head"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
    return exists(
        select 1 from public.roles_tb where user_id = auth.uid() and role = 'program head'
    );
end;
$$;


ALTER FUNCTION "public"."is_program_head"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_table_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."log_table_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."on_auth_user_created"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  role text;
begin
  role = new.raw_user_meta_data ->> 'role'; 

  insert into public.professors_tb (user_id, user_meta_data)
  values (
    new.id,
    new.raw_user_meta_data
  );
  insert into public.roles_tb (user_id, role) values(new.id, role);
  return new;

end;
$$;


ALTER FUNCTION "public"."on_auth_user_created"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."on_auth_user_updated"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin

  update public.professors_tb
  set user_meta_data = new.raw_user_meta_data
  where user_id = new.id;
  return new;

  update public.roles_tb
  set role = new.raw_user_meta_data ->> 'role'
  where user_id = new.id;
  return new;

end;
$$;


ALTER FUNCTION "public"."on_auth_user_updated"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."class_schedules_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "school_year_id" bigint NOT NULL,
    "semester" "text" NOT NULL,
    "year_level_id" bigint NOT NULL,
    "section_id" bigint NOT NULL,
    "department_id" bigint NOT NULL,
    "subject_id" bigint NOT NULL,
    "day" character varying NOT NULL,
    "room_id" bigint NOT NULL,
    "initial_time" time without time zone NOT NULL,
    "final_time" time without time zone NOT NULL,
    "professor_id" "uuid" NOT NULL
);


ALTER TABLE "public"."class_schedules_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."class_schedules_tb" IS 'list of class schedules';



ALTER TABLE "public"."class_schedules_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."class_schedules_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."faculties_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "professor_id" "uuid" NOT NULL,
    "schedule_id" bigint NOT NULL,
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL
);


ALTER TABLE "public"."faculties_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."faculties_tb" IS 'list of assigned faculty';



ALTER TABLE "public"."faculties_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."faculties_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."logs_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" character varying NOT NULL,
    "location_name" "text" NOT NULL
);


ALTER TABLE "public"."logs_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."logs_tb" IS 'list of logs';



ALTER TABLE "public"."logs_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."logs_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."professors_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_meta_data" "jsonb" NOT NULL
);


ALTER TABLE "public"."professors_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."professors_tb" IS 'list of professors';



CREATE TABLE IF NOT EXISTS "public"."programs_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "code" character varying NOT NULL,
    "description" "text" NOT NULL,
    "head" "text" NOT NULL
);


ALTER TABLE "public"."programs_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."programs_tb" IS 'list of programs';



ALTER TABLE "public"."programs_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."programs_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."requests_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "professor_id" "uuid" NOT NULL,
    "schedule" "jsonb" NOT NULL,
    "reason" "text" NOT NULL,
    "status" character varying DEFAULT 'Pending'::character varying NOT NULL,
    "reference_id" character varying NOT NULL
);


ALTER TABLE "public"."requests_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."requests_tb" IS 'list of request_tb';



ALTER TABLE "public"."requests_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."requests_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."roles_tb" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role" character varying NOT NULL
);


ALTER TABLE "public"."roles_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."roles_tb" IS 'list of role';



CREATE TABLE IF NOT EXISTS "public"."rooms_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "text" NOT NULL,
    "number" numeric NOT NULL,
    "code" character varying NOT NULL,
    "department_id" bigint NOT NULL
);


ALTER TABLE "public"."rooms_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."rooms_tb" IS 'list of rooms';



ALTER TABLE "public"."rooms_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."rooms_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."school_years_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "year" character varying NOT NULL,
    "department_id" bigint NOT NULL
);


ALTER TABLE "public"."school_years_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."school_years_tb" IS 'list of school years';



ALTER TABLE "public"."school_years_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."school_years_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."sections_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "class" character varying NOT NULL,
    "section_code" character varying NOT NULL,
    "department_id" bigint NOT NULL
);


ALTER TABLE "public"."sections_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."sections_tb" IS 'list of sections';



ALTER TABLE "public"."sections_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."sections_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."subjects_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "code" character varying NOT NULL,
    "unit" numeric NOT NULL,
    "department_id" bigint NOT NULL
);


ALTER TABLE "public"."subjects_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."subjects_tb" IS 'list of subjects';



ALTER TABLE "public"."subjects_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subjects_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."year_levels_tb" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "levels" "jsonb" NOT NULL,
    "department_id" bigint NOT NULL
);


ALTER TABLE "public"."year_levels_tb" OWNER TO "postgres";


COMMENT ON TABLE "public"."year_levels_tb" IS 'list of year levels';



ALTER TABLE "public"."year_levels_tb" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."year_levels_tb_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faculties_tb"
    ADD CONSTRAINT "faculties_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."logs_tb"
    ADD CONSTRAINT "logs_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."professors_tb"
    ADD CONSTRAINT "professors_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."programs_tb"
    ADD CONSTRAINT "programs_tb_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."programs_tb"
    ADD CONSTRAINT "programs_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."requests_tb"
    ADD CONSTRAINT "requests_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."requests_tb"
    ADD CONSTRAINT "requests_tb_reference_id_key" UNIQUE ("reference_id");



ALTER TABLE ONLY "public"."roles_tb"
    ADD CONSTRAINT "roles_tb_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."rooms_tb"
    ADD CONSTRAINT "rooms_tb_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."rooms_tb"
    ADD CONSTRAINT "rooms_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."school_years_tb"
    ADD CONSTRAINT "school_years_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sections_tb"
    ADD CONSTRAINT "sections_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sections_tb"
    ADD CONSTRAINT "sections_tb_section_code_key" UNIQUE ("section_code");



ALTER TABLE ONLY "public"."subjects_tb"
    ADD CONSTRAINT "subjects_tb_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."subjects_tb"
    ADD CONSTRAINT "subjects_tb_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."year_levels_tb"
    ADD CONSTRAINT "year_levels_tb_department_key" UNIQUE ("department_id");



ALTER TABLE ONLY "public"."year_levels_tb"
    ADD CONSTRAINT "year_levels_tb_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "log_class_schedules_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."class_schedules_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_programs_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."programs_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_rooms_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."rooms_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_school_years_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."school_years_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_sections_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."sections_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_subjects_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."subjects_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



CREATE OR REPLACE TRIGGER "log_year_levels_tb_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."year_levels_tb" FOR EACH ROW EXECUTE FUNCTION "public"."log_table_changes"();



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."professors_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_school_year_id_fkey" FOREIGN KEY ("school_year_id") REFERENCES "public"."school_years_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."sections_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."class_schedules_tb"
    ADD CONSTRAINT "class_schedules_tb_year_level_id_fkey" FOREIGN KEY ("year_level_id") REFERENCES "public"."year_levels_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."faculties_tb"
    ADD CONSTRAINT "faculties_tb_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."professors_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."faculties_tb"
    ADD CONSTRAINT "faculties_tb_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."class_schedules_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."logs_tb"
    ADD CONSTRAINT "logs_tb_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."professors_tb"
    ADD CONSTRAINT "professors_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."requests_tb"
    ADD CONSTRAINT "requests_tb_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."professors_tb"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."roles_tb"
    ADD CONSTRAINT "roles_tb_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."rooms_tb"
    ADD CONSTRAINT "rooms_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."school_years_tb"
    ADD CONSTRAINT "school_years_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sections_tb"
    ADD CONSTRAINT "sections_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subjects_tb"
    ADD CONSTRAINT "subjects_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."year_levels_tb"
    ADD CONSTRAINT "year_levels_tb_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."programs_tb"("id") ON DELETE CASCADE;



CREATE POLICY "Allow all for admin or program head" ON "public"."rooms_tb" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all for admin or program head" ON "public"."year_levels_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin" ON "public"."programs_tb" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Allow all if admin or program head" ON "public"."class_schedules_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin or program head" ON "public"."faculties_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin or program head" ON "public"."requests_tb" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin or program head" ON "public"."school_years_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin or program head" ON "public"."sections_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow all if admin or program head" ON "public"."subjects_tb" TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"())) WITH CHECK (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow delete if professor" ON "public"."requests_tb" FOR DELETE TO "authenticated" USING (("public"."is_professor"() AND ("auth"."uid"() = "professor_id")));



CREATE POLICY "Allow if professor" ON "public"."requests_tb" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_professor"());



CREATE POLICY "Allow select for teacher and program_head" ON "public"."class_schedules_tb" FOR SELECT TO "authenticated" USING (("public"."is_professor"() OR "public"."is_program_head"()));



CREATE POLICY "Allow select if admin" ON "public"."logs_tb" FOR SELECT TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Allow select if admin or program head" ON "public"."professors_tb" FOR SELECT TO "authenticated" USING (("public"."is_admin"() OR "public"."is_program_head"()));



CREATE POLICY "Allow select if logged in" ON "public"."faculties_tb" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow select if prof" ON "public"."requests_tb" FOR SELECT TO "authenticated" USING (("public"."is_professor"() AND ("auth"."uid"() = "professor_id")));



CREATE POLICY "Allow update if professor" ON "public"."requests_tb" FOR UPDATE TO "authenticated" USING (("public"."is_professor"() AND ("auth"."uid"() = "professor_id"))) WITH CHECK (("public"."is_professor"() AND ("auth"."uid"() = "professor_id")));



CREATE POLICY "Public select" ON "public"."programs_tb" FOR SELECT USING (true);



ALTER TABLE "public"."class_schedules_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faculties_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."logs_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."professors_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."programs_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."requests_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."roles_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."rooms_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."school_years_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sections_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subjects_tb" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."year_levels_tb" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON FUNCTION "public"."drop_triggers_and_function"() TO "anon";
GRANT ALL ON FUNCTION "public"."drop_triggers_and_function"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."drop_triggers_and_function"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_professor"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_professor"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_professor"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_program_head"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_program_head"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_program_head"() TO "service_role";



GRANT ALL ON FUNCTION "public"."log_table_changes"() TO "anon";
GRANT ALL ON FUNCTION "public"."log_table_changes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_table_changes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "anon";
GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."on_auth_user_created"() TO "service_role";



GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "anon";
GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."on_auth_user_updated"() TO "service_role";


















GRANT ALL ON TABLE "public"."class_schedules_tb" TO "anon";
GRANT ALL ON TABLE "public"."class_schedules_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."class_schedules_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."class_schedules_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."class_schedules_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."class_schedules_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."faculties_tb" TO "anon";
GRANT ALL ON TABLE "public"."faculties_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."faculties_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."faculties_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."faculties_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."faculties_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."logs_tb" TO "anon";
GRANT ALL ON TABLE "public"."logs_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."logs_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."logs_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."logs_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."logs_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."professors_tb" TO "anon";
GRANT ALL ON TABLE "public"."professors_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."professors_tb" TO "service_role";



GRANT ALL ON TABLE "public"."programs_tb" TO "anon";
GRANT ALL ON TABLE "public"."programs_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."programs_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."programs_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."programs_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."programs_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."requests_tb" TO "anon";
GRANT ALL ON TABLE "public"."requests_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."requests_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."requests_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."requests_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."requests_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."roles_tb" TO "anon";
GRANT ALL ON TABLE "public"."roles_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."roles_tb" TO "service_role";



GRANT ALL ON TABLE "public"."rooms_tb" TO "anon";
GRANT ALL ON TABLE "public"."rooms_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."rooms_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."rooms_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."rooms_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."rooms_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."school_years_tb" TO "anon";
GRANT ALL ON TABLE "public"."school_years_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."school_years_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."school_years_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."school_years_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."school_years_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."sections_tb" TO "anon";
GRANT ALL ON TABLE "public"."sections_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."sections_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."sections_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."sections_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."sections_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."subjects_tb" TO "anon";
GRANT ALL ON TABLE "public"."subjects_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."subjects_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subjects_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subjects_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subjects_tb_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."year_levels_tb" TO "anon";
GRANT ALL ON TABLE "public"."year_levels_tb" TO "authenticated";
GRANT ALL ON TABLE "public"."year_levels_tb" TO "service_role";



GRANT ALL ON SEQUENCE "public"."year_levels_tb_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."year_levels_tb_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."year_levels_tb_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
