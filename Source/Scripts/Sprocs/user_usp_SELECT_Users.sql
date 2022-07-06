CREATE PROCEDURE [user].[usp_SELECT_Users_BySoundex]
	@UserSoundex varchar(4)
AS
BEGIN

	SELECT 
		UserID,
		Username,
		UserSoundex,
		Balance
	FROM
		Users
	WHERE
		UserSoundex = @UserSoundex
END