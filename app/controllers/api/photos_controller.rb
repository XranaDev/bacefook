class Api::PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :destroy]

  def create
    @photo = current_user.photos.new(comment_params)
    if @photo.save
      render json: @photo, status: :ok
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  def index
    @photos = Photo.where(account: current_user)
  end

  def destroy
    @photo.destroy
    head :no_content
  end

  private

  def photo_params
    params.require(:photo).permit(:id, :account_id, :account_type, :post_id, :file)
  end

  def set_photo
    @photo = Photo.find(params[:id])
  end
end
