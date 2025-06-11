import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { Manager, Tenant, Property, Application } from "./prismaTypes";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
  enum AmenityEnum {
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Dishwasher = "Dishwasher",
    HighSpeedInternet = "HighSpeedInternet",
    HardwoodFloors = "HardwoodFloors",
    WalkInClosets = "WalkInClosets",
    Microwave = "Microwave",
    Refrigerator = "Refrigerator",
    Pool = "Pool",
    Gym = "Gym",
    Parking = "Parking",
    PetsAllowed = "PetsAllowed",
    WiFi = "WiFi",
  }

  enum HighlightEnum {
    HighSpeedInternetAccess = "HighSpeedInternetAccess",
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Heating = "Heating",
    SmokeFree = "SmokeFree",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    DoubleVanities = "DoubleVanities",
    TubShower = "TubShower",
    Intercom = "Intercom",
    SprinklerSystem = "SprinklerSystem",
    RecentlyRenovated = "RecentlyRenovated",
    CloseToTransit = "CloseToTransit",
    GreatView = "GreatView",
    QuietNeighborhood = "QuietNeighborhood",
  }

  enum PropertyTypeEnum {
    Rooms = "Rooms",
    Tinyhouse = "Tinyhouse",
    Apartment = "Apartment",
    Villa = "Villa",
    Townhouse = "Townhouse",
    Cottage = "Cottage",
  }

  interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
  }

  interface ContactWidgetProps {
    onOpenModal: () => void;
  }

  interface ImagePreviewsProps {
    images: string[];
  }

  interface PropertyDetailsProps {
    propertyId: number;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface PropertyLocationProps {
    propertyId: number;
  }

  interface ApplicationCardProps {
    application: Application;
    userType: "manager" | "renter";
    children: React.ReactNode;
  }

  interface CardProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface CardCompactProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
  }

  interface NavbarProps {
    isDashboard: boolean;
  }

  interface AppSidebarProps {
    userType: "manager" | "tenant";
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
    userType: "manager" | "tenant";
  }

  interface UserRole {
    id: string;
    name: Tenant | Manager;
    permissions: string[];
  }

  interface User {
    id: number;
    clerkUserId: string;
    name: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    favorites: any[];
    role: Tenant | Manager; // Using union type for better type safety
  }
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: any;
  }
  interface CreateUserRequest {
    clerkId: string;
    email: string;
    fullName?: string;
    role?: "manager" | "tenant";
  }
  interface ClerkUserResource
    extends ClerkResource,
      CommercePaymentSourceMethods {
    id: string;
    externalId: string | null;
    primaryEmailAddressId: string | null;
    primaryEmailAddress: EmailAddressResource | null;
    primaryPhoneNumberId: string | null;
    primaryPhoneNumber: PhoneNumberResource | null;
    primaryWeb3WalletId: string | null;
    primaryWeb3Wallet: Web3WalletResource | null;
    username: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string;
    hasImage: boolean;
    emailAddresses: EmailAddressResource[];
    phoneNumbers: PhoneNumberResource[];
    web3Wallets: Web3WalletResource[];
    externalAccounts: ExternalAccountResource[];
    enterpriseAccounts: EnterpriseAccountResource[];
    passkeys: PasskeyResource[];
    samlAccounts: SamlAccountResource[];
    organizationMemberships: OrganizationMembershipResource[];
    passwordEnabled: boolean;
    totpEnabled: boolean;
    backupCodeEnabled: boolean;
    twoFactorEnabled: boolean;
    publicMetadata: UserPublicMetadata;
    unsafeMetadata: UserUnsafeMetadata;
    lastSignInAt: Date | null;
    createOrganizationEnabled: boolean;
    createOrganizationsLimit: number | null;
    deleteSelfEnabled: boolean;
    updatedAt: Date | null;
    createdAt: Date | null;
  }
}

export {};
