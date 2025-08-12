class Github {
  private repoOwner = "WhoamiUnderscore"
  private repoName = "Marine-Portfolio"
  private branch = "dev" // todo: Mettre main quand projet fait
  private githubToken = process.env.GITHUB_CONNECTION

  private header = {
    Authorization: `Bearer ${this.githubToken}`,
    "Content-Type": 'application/json'
  }
}
