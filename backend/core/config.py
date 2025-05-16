from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "DEV"
    BASE_PREFIX: str = ""
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int = 3306
    DB_NAME: str

    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        return (
            f"mysql+asyncmy://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


    class Config:
        env_file = ".env"


settings = Settings()

IS_DEV = settings.ENVIRONMENT == "DEV"
