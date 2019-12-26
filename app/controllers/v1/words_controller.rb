class V1::WordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def words
    if params[:letters].present?
      response = GetAllowableWordsService.new(letters: params[:letters]).call
      render json: { words: response, status: 200 }
    end
  end
end