RSpec.describe GamesController, :type => :controller do
  describe 'Words' do
    def trigger
      post :words
    end
    context 'find words from api' do
      let(:params) do 
        {letters: "abcdabcdabcdabcd"}
      end

      before do
        expect(GetAllowableWordsService.new({:letters=>"abcdabcdabcdabcd"}))
      end

      it "returns a correct status code" do
        post :words, params: params
        expect(response.status).to eq 200
      end
      
      it do
        trigger
      end
    end
  end
end