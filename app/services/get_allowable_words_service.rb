class GetAllowableWordsService
  require 'uri'
  require 'net/http'
  require 'openssl'
  require 'matrix'

  attr_accessor :letters
  
  def initialize(params)
    @letters = params[:letters]
  end

  def call
    using_third_party
    #inner_library
  end


  private

  def using_third_party
    url = URI("https://codebox-boggle-v1.p.rapidapi.com/#{letters}")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-host"] = "codebox-boggle-v1.p.rapidapi.com",
    request["x-rapidapi-key"] = "7b5640f2f1msh6c6d86277a2a260p14c125jsn8d0945228547",
    response = http.request(request)
    json_response = response.read_body
  end


  def inner_library
  end

end