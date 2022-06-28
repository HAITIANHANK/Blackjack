CREATE TABLE [user].[Users](
	[UserID] int IDENTITY(1,1) NOT NULL,
	[Username] varchar(50) NOT NULL,
	[UserSoundex] varchar(4) NOT NULL,
	[Balance] int NOT NULL,
	CONSTRAINT [PK_Users_UserID] PRIMARY KEY(UserID),
	CONSTRAINT [UNQ_Users_Username] UNIQUE(Username)
)