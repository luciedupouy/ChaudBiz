﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(ChaudBizContext))]
    partial class ChaudBizContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("Chantier", b =>
                {
                    b.Property<int>("ChantierId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Adresse")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ClientId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateDebut")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateFin")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NomChantier")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Statut")
                        .HasColumnType("INTEGER");

                    b.HasKey("ChantierId");

                    b.HasIndex("ClientId");

                    b.ToTable("Chantiers");
                });

            modelBuilder.Entity("Client", b =>
                {
                    b.Property<int>("ClientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("MailClient")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NomClient")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PrenomClient")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Tel")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ClientId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Document", b =>
                {
                    b.Property<int>("DocumentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ClientId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateDocument")
                        .HasColumnType("TEXT");

                    b.Property<int>("EtatDocument")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MontantDocument")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("DocumentId");

                    b.HasIndex("ClientId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("Materiel", b =>
                {
                    b.Property<int>("MaterielId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Etat")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantite")
                        .HasColumnType("INTEGER");

                    b.HasKey("MaterielId");

                    b.ToTable("Materiels");
                });

            modelBuilder.Entity("Rdv", b =>
                {
                    b.Property<int>("RdvId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ClientId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateRdv")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Lieu")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UtilisateurId")
                        .HasColumnType("INTEGER");

                    b.HasKey("RdvId");

                    b.HasIndex("ClientId");

                    b.HasIndex("UtilisateurId");

                    b.ToTable("Rdvs");
                });

            modelBuilder.Entity("Utilisateur", b =>
                {
                    b.Property<int>("UtilisateurId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("MailUtilisateur")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Mdp")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("NomUtilisateur")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PrenomUtilisateur")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("UtilisateurId");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("Chantier", b =>
                {
                    b.HasOne("Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("Document", b =>
                {
                    b.HasOne("Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("Rdv", b =>
                {
                    b.HasOne("Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Utilisateur", "Utilisateur")
                        .WithMany()
                        .HasForeignKey("UtilisateurId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Utilisateur");
                });
#pragma warning restore 612, 618
        }
    }
}
