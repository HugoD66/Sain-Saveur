// NotificationTypes.ts
export interface BaseNotification {
  type: "user" | "recipe";
  title: string;
  date: string;
  seen: boolean;
}

export interface UserNotification extends BaseNotification {
  type: "user";
  content: { pseudo: string; email: string };
}

export interface RecipeNotification extends BaseNotification {
  type: "recipe";
  content: { recipeId: string; recipeName: string };
}

export type Notification = UserNotification | RecipeNotification;
