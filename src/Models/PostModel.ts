export interface PostDB {
    creatorId: string,
    content: string
}

export class Post {
  constructor(
    private id: string,
    private creatorId: string,
    private content: string,
    private likes: number = 0,
    private dislikes: number = 0
  ) {}

    public getId() {
        return this.id
    }

    public getCreatorId() {
        return this.creatorId
    }

    public setCreatorId(creatorId: string): void {
        this.creatorId = creatorId
    }

    public getContent() {
        return this.content
    }

    public setContent(content: string): void {
        this.content = content
    }

    public getLikes() {
        return this.likes
    }

    public addLike() {
        this.likes++
    }

    public removeLike() {
        this.likes--
    }

    public getDislikes() {
        return this.dislikes
    }

    public addDislike() {
        this.dislikes++
    }

    public removeDislike() {
        this.dislikes--
    }

}
