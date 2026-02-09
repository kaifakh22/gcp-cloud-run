terraform {
  backend "gcs" {
    bucket  = "terraform-state-pub-tf-state-bucket-01-483614"
    prefix  = "terraform"
  }
}
