using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace server.Services;

public class CustomersService
{
  private readonly IMongoCollection<Customer> _customersCollection;

  public CustomersService(IOptions<DatabaseSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    var database = client.GetDatabase(settings.Value.DatabaseName);

    _customersCollection = database.GetCollection<Customer>("customers");
  }

  public async Task<List<Customer>> GetAsync() =>
    await _customersCollection.Find(_ => true).ToListAsync();

  public async Task<List<Customer>> GetAsync(DateTime date)
  {
    var min = date.Date.AddHours(0).AddMinutes(0).AddSeconds(0);
    var max = date.Date.AddDays(1);
    var customers = await _customersCollection.Find(x => 
      x.order_datetime > min & x.order_datetime < max).ToListAsync();
    return customers;
  }
    
  public async Task<Customer?> GetAsync(string id) =>
    await _customersCollection.Find(x => x._id == id).FirstOrDefaultAsync();

  public async Task CreateAsync(Customer customer) =>
    await _customersCollection.InsertOneAsync(customer);

  public async Task UpdateAsync(string id, Customer customer) =>
    await _customersCollection.ReplaceOneAsync(x => x._id == id, customer);

  public async Task RemoveAsync(string id) =>
    await _customersCollection.DeleteOneAsync(x => x._id == id);
}