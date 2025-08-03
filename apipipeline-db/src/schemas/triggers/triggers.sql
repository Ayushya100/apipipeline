CREATE TRIGGER svc_config_update_trigger
BEFORE UPDATE ON svc_config
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER path_config_update_trigger
BEFORE UPDATE ON path_config
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_role_update_trigger
BEFORE UPDATE ON user_role
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_scope_update_trigger
BEFORE UPDATE ON user_scope
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER role_scope_update_trigger
BEFORE UPDATE ON role_scope
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER dashboard_setup_header_update_trigger
BEFORE UPDATE ON dashboard_setup_header
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER dashboard_setup_update_trigger
BEFORE UPDATE ON dashboard_setup
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER role_dashboard_update_trigger
BEFORE UPDATE ON role_dashboard
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER users_update_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_metadata_update_trigger
BEFORE UPDATE ON user_metadata
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_dashboard_update_trigger
BEFORE UPDATE ON user_dashboard
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problem_type_update_trigger
BEFORE UPDATE ON problem_type
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER support_language_update_trigger
BEFORE UPDATE ON support_language
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER tags_update_trigger
BEFORE UPDATE ON tags
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problems_update_trigger
BEFORE UPDATE ON problems
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER api_problem_meta_update_trigger
BEFORE UPDATE ON api_problem_meta
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problem_examples_update_trigger
BEFORE UPDATE ON problem_examples
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problem_hints_update_trigger
BEFORE UPDATE ON problem_hints
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problem_tags_update_trigger
BEFORE UPDATE ON problem_tags
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER problem_test_cases_update_trigger
BEFORE UPDATE ON problem_test_cases
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_submission_hdr_update_trigger
BEFORE UPDATE ON user_submission_hdr
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_submission_dtl_update_trigger
BEFORE UPDATE ON user_submission_dtl
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER user_problems_update_trigger
BEFORE UPDATE ON user_problems
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER code_execution_job_update_trigger
BEFORE UPDATE ON code_execution_job
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER execution_testcase_response_update_trigger
BEFORE UPDATE ON execution_testcase_response
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER playlist_update_trigger
BEFORE UPDATE ON playlist
FOR EACH ROW
EXECUTE FUNCTION update_version();

CREATE TRIGGER playlist_items_update_trigger
BEFORE UPDATE ON playlist_items
FOR EACH ROW
EXECUTE FUNCTION update_version();