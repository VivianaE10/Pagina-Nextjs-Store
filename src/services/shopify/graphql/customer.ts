import { GraphQLClientSingleton } from "app/graphql";
import { getOrdersQuery } from "app/graphql/queries/getOrders";
import { cookies } from "next/headers";

interface Order {
  id: string;
  [key: string]: any;
}

interface OrderEdge {
  node: Order;
}

interface CustomerOrders {
  customer: {
    orders: {
      edges: OrderEdge[];
      totalCount: number;
    };
  };
}

export const getCustomerOrders = async () => {
  const cookiesStorage = await cookies();
  const accessToken = cookiesStorage.get("accessToken")?.value || "";
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const variables = {
    customerAccessToken: accessToken,
  };

  const { customer }: CustomerOrders = await graphqlClient.request(
    getOrdersQuery,
    variables,
  );
  const orders = customer?.orders?.edges.map((edge) => edge.node);
  return {
    totalOrders: customer?.orders?.totalCount,
    orders,
  };
};
