using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class Service
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? _id { get; set; }

  public string? name { get; set; }

  public string? description { get; set; }

  public Int32? price { get; set; }
}