CREATE TABLE [user].[Users](
	[UserID] int IDENTITY(1,1) NOT NULL,
	[Username] varchar(50) NOT NULL,
	[UsernameHash] varchar(32) NOT NULL,
	[Balance] int NOT NULL,
	CONSTRAINT [PK_Users_UserID] PRIMARY KEY(UserID),
	CONSTRAINT [UNQ_Users_UsernameHash] UNIQUE(UsernameHash)
)