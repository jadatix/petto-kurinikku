using server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace server.Services;

public class ServicesService
{
  private readonly IMongoCollection<Service> _servicesCollection;

  public ServicesService(IOptions<DatabaseSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    var database = client.GetDatabase(settings.Value.DatabaseName);

    _servicesCollection = database.GetCollection<Service>("services");
  }

  public async Task<List<Service>> GetAsync() =>
    await _servicesCollection.Find(_ => true).ToListAsync();
    
  public async Task<Service?> GetAsync(string id) =>
    await _servicesCollection.Find(x => x._id == id).FirstOrDefaultAsync();

  public async Task CreateAsync(Service service) =>
    await _servicesCollection.InsertOneAsync(service);

  public async Task UpdateAsync(string id, Service service) =>
    await _servicesCollection.ReplaceOneAsync(x => x._id == id, service);

  public async Task RemoveAsync(string id) =>
    await _servicesCollection.DeleteOneAsync(x => x._id == id);
}