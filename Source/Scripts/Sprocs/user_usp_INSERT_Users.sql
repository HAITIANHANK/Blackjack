CREATE PROCEDURE [user].[usp_INSERT_User]
	@Username varchar(50),
	@UserSoundex varchar(4),
	@Balance int
AS
BEGIN TRY
	BEGIN TRANSACTION
	INSERT INTO Users(Username, UserSoundex, Balance)
	VALUES (@Username, @UserSoundex, @Balance)
	COMMIT TRANSACTION
END TRY
BEGIN CATCH
	IF XACT_STATE() <> 0
		BEGIN 
			ROLLBACK TRANSACTION
			PRINT('An error has occurred. The insert transaction has been rolled back.')
		END;
	THROW
END CATCH