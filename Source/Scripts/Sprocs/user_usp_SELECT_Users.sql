CREATE PROCEDURE [user].[user_usp_SELECT_Users]
	@UserSoundex varchar(4),
	@UserID int
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
		@UserSoundex = UserSoundex AND
		@UserID = UserID
END
