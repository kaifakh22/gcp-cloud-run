provider "google" {
    project = var.project_id
    region  = var.region
}

resource "google_service_account" "test_sa" {
  account_id   = "tf-test-sa"
  display_name = "Terraform Test Service Account"
}