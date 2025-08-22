//
// ------ Backend | Front End -----
//

export type ReviewType = {
  _id: string,
  name: string,
  review: string,
  job?: string
}

export type NewReviewType = {
  name: string,
  review: string,
  job?: string
}
