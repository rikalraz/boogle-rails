RSpec.describe GetAllowableWordsService, :type => :service do
  describe 'when success' do
    context '#initialize' do
      let(:params) do 
        {letters: "abcdabcdabcdabcd"}
      end
      it 'should initialize params' do
        expect(described_class.new(letters: params[:letters])).to be_present
      end
    end
  end
  context 'get allowable words from api' do
    uri = URI.parse(URI.encode('https://codebox-boggle-v1.p.rapidapi.com/lovesofatestrose"'))
    response = Net::HTTP.get(uri)
    it 'Get success response' do
      expect(response).to be_an_instance_of(String)
    end
  end
end