using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models;

public class Customer
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? _id { get; set; }

  public string? name { get; set; }

  public string? phone { get; set; }

  public string? email { get; set; }

  public string? message { get; set; }

  public string? ordered_service { get; set; }

  public string? examined_doctor { get; set; }

  [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
  public DateTime order_datetime { get; set; }
};